import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import Footer from '@/components/shared/Footer'
import { Link } from 'react-router-dom'
import Stats from '@/components/dashboard/Stats'
import ClicksChart from '@/components/dashboard/ClicksChart'
import FeedsChart from '@/components/dashboard/FeedsChart'
import ClientDataTable from '@/components/dashboard/ClientDataTable'

const Home = () => {
    return (
        <>
            <PageHeader >
                {/* <PageHeaderDate /> */}

                <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                    <Link className="btn btn-md btn-light-brand" style={{ paddingTop: "12px", paddingBottom: "12px" }} data-bs-toggle="dropdown" data-bs-offset="0, 10" data-bs-auto-close="outside">
                        <span>Job Stats</span>
                    </Link>

                    <Link className="btn btn-md btn-light-brand" style={{ paddingTop: "12px", paddingBottom: "12px" }} data-bs-toggle="dropdown" data-bs-offset="0, 10" data-bs-auto-close="outside">
                        <span>Conversion Tracking</span>
                    </Link>

                    <Link className="btn btn-md btn-light-brand" style={{ paddingTop: "12px", paddingBottom: "12px" }} data-bs-toggle="dropdown" data-bs-offset="0, 10" data-bs-auto-close="outside">
                        <span>Publisher Management</span>
                    </Link>
                </div>
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <Stats />
                    <ClicksChart />
                    <FeedsChart />
                    <ClientDataTable />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home