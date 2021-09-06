import logo from './logo.svg';
import './App.css';
import {useState} from "react";


function App() {

    // окно перетаскивания и загрузки файла
    const [drag, setDrag] = useState(false)

  const [boards, setBoard] = useState([
    {id: 1, title: 'Сделать', items: [
        {id: 1, title: 'Пойти в магазин'},
        {id: 2, title: 'Выкинуть мусор'},
        {id: 3, title: 'Поработать на компе'},
      ]},
    {id: 2, title: 'Проверить', items: [
        {id: 4, title: 'Код ревью'},
        {id: 5, title: 'задача на факторинг'},
        {id: 6, title: 'Контрольные работы'},
      ]},

    {id: 3, title: 'Сделано', items: [
        {id: 7, title: 'Cнять видео'},
        {id: 8, title: 'Смотрировать'},
        {id: 9, title: 'Запостить на Youtube'},
      ]},

  ])

    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)

    function dragOverHandler(e) {
        e.preventDefault()
        if (e.target.className == 'item') {
            e.target.style.boxShadow = '0 2px 3px gray'
        }
        //  e.target.style.background = 'lightgray'
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'

    }

    function dragStartHandler(e, board, item) {
      setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dropHandler(e, board, item) {
      e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)
        setBoard(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
    }
    
    function dropCardHandler(e, board) {
      board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        setBoard(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
    }


function dragStartFileHandler(e) {
        e.preventDefault()
    setDrag(true)
}

function dragLeaveFileHandler(e) {
        e.preventDefault()
    setDrag(false)
}

function onDropFileHandler(e) {
        e.preventDefault()
    let files = [...e.dataTransfer.files]
    console.log(files)

    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('userId', 1)
// отправляем на сервер через axios
   // axios.post('url', formData, options)

    setDrag(false)
}


  return (
    <div className="app">

      {boards.map(board =>
          <div
              className="board"
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropCardHandler(e, board)}
          >
            <div className="board__title">{board.title}</div>
            {board.items.map(item =>
            <div
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
                draggable={true}
                key={item.id}
                className="item">{item.title}</div>
            )}
          </div>
      )}


      <div>
          <br />
          {drag
              ? <div
                  className="drop-area"
                  onDragStart={e => dragStartFileHandler(e)}
                  onDragLeave={e => dragLeaveFileHandler(e)}
                  onDragOver={e => dragStartFileHandler(e)}
                  onDrop={e => onDropFileHandler(e)}
              >Отпустите файлы, чтобы загрузить их</div>
              : <div
              onDragStart={e => dragStartFileHandler(e)}
              onDragLeave={e => dragLeaveFileHandler(e)}
              onDragOver={e => dragStartFileHandler(e)}
              >Перетащите файлы, чтобы загрузить их</div>
          }
      </div>

    </div>
  );
}

export default App;
