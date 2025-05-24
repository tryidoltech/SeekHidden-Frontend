import React, { Fragment } from 'react'
import ReactApexChart from 'react-apexcharts'
import CardHeader from '@/components/shared/CardHeader'
import useCardTitleActions from '@/hooks/useCardTitleActions'
import CardLoader from '@/components/shared/CardLoader'
import { FiLink2 } from 'react-icons/fi'
import { feedsOptions } from '@/utils/dashboard/feedsOptions'

const feedsData = [
    { feeds: 'Active Feeds', color: '#FF9F43' },
    { feeds: 'Error Feeds', color: '#DC3545' },
    { feeds: 'Paused Feeds', color: '#3454D1' },
];

const FeedsChart = () => {
    const chartOptions = feedsOptions()
    const { refreshKey, isRemoved, isExpanded, handleRefresh, handleExpand, handleDelete } = useCardTitleActions();

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col-xxl-4">
            <div className={`card stretch stretch-full leads-overview ${isExpanded ? "card-expand" : ""} ${refreshKey ? "card-loading" : ""}`}>
                <CardHeader title={"Feeds"} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} />
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-center" >
                        <ReactApexChart
                            type='donut'
                            options={chartOptions}
                            series={chartOptions.series}
                            width={400}
                        />
                    </div>
                    <div className="d-flex gap-3 align-items-center justify-content-center mt-4">
                        {feedsData.map(({ clicks, feeds, color }, index) => (
                            <Fragment key={index}>
                                <div className="hstack d-flex align-items-center gap-1">
                                    <div
                                        className='rounded-pill'
                                        style={{
                                            backgroundColor: color,
                                            height: "10px",
                                            width: "10px",
                                        }}>
                                    </div>
                                    <div className="hstack">
                                        <a href="#">
                                            <span>{feeds}</span>
                                        </a>
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>
                <CardLoader refreshKey={refreshKey} />
            </div>
        </div>
    )
}

export default FeedsChart
