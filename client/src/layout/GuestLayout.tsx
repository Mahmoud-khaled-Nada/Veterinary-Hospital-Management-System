import { FC } from "react"
import { Outlet } from "react-router-dom"


const GuestLayout:FC = () => {
  return (
    <>
    <Outlet />
    </>
  )
}

export default GuestLayout