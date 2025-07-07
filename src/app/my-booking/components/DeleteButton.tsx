'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { MdDelete } from 'react-icons/md'
import Swal from 'sweetalert2'

type DeleteButtonProps = {
  id: string
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
    const router = useRouter();
  const handleDelete = async () => {
    // Logic to handle deletion
    console.log(`Delete button clicked for id: ${id}`)

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await fetch(`http://localhost:3000/api/checkout/${id}`, {
          method: 'DELETE'
        })
        const data = await res.json()
        console.log('Delete Response:', data)
        if (data.deletedCount > 0) {
          Swal.fire({
            title: 'Deleted Successfully',
            text: 'Your booking has been deleted.',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          router.refresh();
        } else {
          Swal.fire({
            title: 'Delete Failed',
            text: 'There was an error deleting your booking.',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      }
    })
  }
  return (
    <td className='py-2 px-4 border-b mx-auto'>
      <MdDelete
        onClick={handleDelete}
        className='text-red-500 cursor-pointer hover:text-red-700 w-9 h-9 mx-auto'
      />
    </td>
  )
}

export default DeleteButton
