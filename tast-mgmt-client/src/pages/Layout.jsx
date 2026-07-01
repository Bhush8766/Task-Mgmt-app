import React from 'react'
import Navbar from '../components/Navbar'
import Dashboard from './Dashboard'
import Asidebar from '../components/Asidebar'

const Layout = () => {
  return (
    <>
        <Navbar ></Navbar>
        <div className="conatiner-fluid">
            <div className="row">
                <div className="col-2">
                    <Asidebar />
                </div>
                <div className="col-10">
                      <Dashboard />

                </div>
            </div>

        </div>
    </>
  )
}

export default Layout