"use client"
import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, querySnapshot,deleteDoc,doc } from "firebase/firestore"; 
import { db } from './firebase'

export default function Home() {
  const [items, setItems] = useState([
  ])
  const [newItem, setNewItem] = useState({name: '', price: 0})
  const [total , setTotal] = useState(0)


// add item to database
const addItem = async (e) => {
  e.preventDefault()
  if(newItem.name !== '' &&  newItem.price !== 0) {
    await addDoc(collection(db, "items"), {
      name: newItem.name.trim(),
      price: newItem.price
    });
    // setItems([...items, newItem])
    setNewItem({name: '', price: 0})
  }
}

//read items from database

// read items from database
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "items"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setItems(data)

      // calculate total
      let total = 0
      data.forEach(item => {
        total += Number(item.price)
      })
      setTotal(total)
    }
    getData()
  }, [])

//delete item from database
const deleteItem = async (id) => {
  await deleteDoc(doc(db, "items", id))
}

//edit item from database


  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className='text-4xl p-4 text-center'>Expense Tracker</h1>
        <div className='bg-slate-400 p-4 text-center'>
          <form className='grid grid-cols-6 items-center text-black'>
            <input value={newItem.name}
            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
             type="text"
              placeholder="Enter Item" 
              className="col-span-3 border-2 mx-2 border-gray-300 p-2 rounded-lg" />
            <input 
            onChange={(e) => setNewItem({...newItem, price: e.target.value})}
            value={newItem.price}
            type="number"
            placeholder="Enter $"
            className="col-span-2 border-2 border-gray-300 p-2 rounded-lg" />
            <button
            onClick={(e) => addItem(e)}
            type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold
             py-2 px-4 mx-2 rounded">Add</button>
          </form>
          <ul>
            {items.map((item,id) => (
              <li key={id} className='my-4 w-full flex justify-between bg-slate-900 text-white'>
                <div className='p-4 w-full flex justify-between'>
                  <span className='capitalize'>{item.name}</span>
                  <span>${item.price}</span>
                </div>
                <button onClick={() => deleteItem(item.id)} className='ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-700 '>X</button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? ('') : (
            <div>
              <span className='text-2xl'>Total: ${total}</span>
              
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
