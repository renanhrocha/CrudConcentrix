import React, { useEffect, useState } from 'react'
import { Button, Pagination } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ItemModal from './ItemModal'

type Item = {
  id: number
  name: string
  description: string
  priority: 'alta' | 'media' | 'baixa'
  createdAt: string
  updatedAt: string
}

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>(
    JSON.parse(localStorage.getItem('items') || '[]')
  )
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [priority, setPriority] = useState<'alta' | 'media' | 'baixa'>('baixa')
  const [filterPriority, setFilterPriority] = useState<string>('')
  const [filterName, setFilterName] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 10
  const [showModal, setShowModal] = useState<boolean>(false)
  const [editingItem, setEditingItem] = useState<Item | null>(null)

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const addItem = () => {
    if (!name || name.length < 3) {
      toast.error(
        'O nome deve ter pelo menos 3 caracteres e não pode ser nulo.'
      )
      return
    }
    if (!description) {
      toast.error('A descrição não pode ser nula.')
      return
    }
    if (!priority) {
      toast.error('Você deve escolher uma prioridade.')
      return
    }

    const now = new Date().toISOString()
    const newItem: Item = {
      id: Date.now(),
      name,
      description,
      priority,
      createdAt: now,
      updatedAt: now,
    }
    setItems([...items, newItem])
    clearForm()
    toast.success('Item adicionado com sucesso!')
  }

  const editItem = (item: Item) => {
    setEditingItem(item)
    setName(item.name)
    setDescription(item.description)
    setPriority(item.priority)
    setShowModal(true)
  }

  const saveItem = () => {
    if (!name || name.length < 3) {
      toast.error(
        'O nome deve ter pelo menos 3 caracteres e não pode ser nulo.'
      )
      return
    }
    if (!description) {
      toast.error('A descrição não pode ser nula.')
      return
    }
    if (!priority) {
      toast.error('Você deve escolher uma prioridade.')
      return
    }

    if (editingItem) {
      const now = new Date().toISOString()
      const updatedItems = items.map((item) =>
        item.id === editingItem.id
          ? { ...item, name, description, priority, updatedAt: now }
          : item
      )
      setItems(updatedItems)
      clearForm()
      setShowModal(false)
      toast.success('Item editado com sucesso!')
    }
  }

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
    toast.success('Item excluído com sucesso!')
  }

  const clearForm = () => {
    setName('')
    setDescription('')
    setPriority('baixa')
    setEditingItem(null)
  }

  const filteredItems = items
    .filter((item) => {
      return (
        (!filterPriority || item.priority === filterPriority) &&
        (!filterName ||
          item.name.toLowerCase().includes(filterName.toLowerCase()))
      )
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      } else {
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      }
    })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container">
      <ToastContainer />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addItem()
        }}
      >
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="item-name">Nome</label>
            <input
              id="item-name"
              type="text"
              className="form-control"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="item-description">Descrição</label>
            <textarea
              id="item-description"
              className="form-control"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="item-priority">Prioridade</label>
            <select
              id="item-priority"
              className="form-control"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as 'alta' | 'media' | 'baixa')
              }
            >
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button type="submit" className="btn btn-success w-100">
              Adicionar
            </button>
          </div>
        </div>
      </form>
      <div className="row mb-4">
        <div className="col-md-4">
          <label htmlFor="filter-name">Filtrar por Nome</label>
          <input
            id="filter-name"
            type="text"
            className="form-control"
            placeholder="Buscar por nome..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="filter-priority">Filtrar por Prioridade</label>
          <select
            id="filter-priority"
            className="form-control"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="sort-order">Ordenar por Data</label>
          <select
            id="sort-order"
            className="form-control"
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as 'newest' | 'oldest')
            }
          >
            <option value="newest">Mais novos</option>
            <option value="oldest">Mais antigos</option>
          </select>
        </div>
      </div>
      <h3>Lista de Itens</h3>
      <ul className="list-group">
        {currentItems.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{item.name}</strong> - {item.description} ({item.priority}
              )
              <br />
              <small>
                Criado em: {new Date(item.createdAt).toLocaleString()}
              </small>
              <br />
              <small>
                Última atualização: {new Date(item.updatedAt).toLocaleString()}
              </small>
            </div>
            <div className="d-flex gap-2">
              <Button
                className="btn-edit"
                size="sm"
                onClick={() => editItem(item)}
              >
                Editar
              </Button>
              <Button size="sm" onClick={() => deleteItem(item.id)}>
                Excluir
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-center my-3">
        <Pagination>
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      <ItemModal
        show={showModal}
        onHide={() => setShowModal(false)}
        item={editingItem}
        setName={setName}
        setDescription={setDescription}
        setPriority={setPriority}
        saveItem={saveItem}
        name={''}
        description={''}
        priority={'alta'}
      />
    </div>
  )
}

export default ItemList
