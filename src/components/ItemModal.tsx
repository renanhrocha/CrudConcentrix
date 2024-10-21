import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'

type Item = {
  id: number
  name: string
  description: string
  priority: 'alta' | 'media' | 'baixa'
  createdAt: string
  updatedAt: string
}

type ItemModalProps = {
  show: boolean
  onHide: () => void
  item: Item | null
  setName: (name: string) => void
  setDescription: (description: string) => void
  setPriority: (priority: 'alta' | 'media' | 'baixa') => void
  saveItem: () => void
  name: string
  description: string
  priority: 'alta' | 'media' | 'baixa'
}

const ItemModal: React.FC<ItemModalProps> = ({
  show,
  onHide,
  item,
  setName,
  setDescription,
  setPriority,
  saveItem,
  name,
  description,
  priority,
}) => {
  useEffect(() => {
    if (item) {
      setName(item.name)
      setDescription(item.description)
      setPriority(item.priority)
    }
  }, [item, setName, setDescription, setPriority])

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{item ? 'Editar Item' : 'Adicionar Item'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Prioridade</label>
            <select
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
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={saveItem}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ItemModal
