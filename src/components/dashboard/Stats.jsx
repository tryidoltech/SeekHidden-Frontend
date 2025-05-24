import React from 'react'
import { FiArrowDownCircle, FiArrowUpCircle } from 'react-icons/fi'

const data = [
    { title: "Jobs", average_value: "152488", average_value_count: "", curret_value: "", trend: "" },
    { title: "Applies", average_value: "0", average_value_count: "", curret_value: "", trend: "" },
    { title: "CR%", average_value: "00.00", average_value_count: "%", curret_value: "", trend: "" },
    { title: "Spend", average_value: "00.00", average_value_count: "USD", curret_value: "", trend: "" },
    { title: "CPA", average_value: "00.00", average_value_count: "USD", curret_value: "", trend: "" },
    { title: "CPC", average_value: "00.00", average_value_count: "USD", curret_value: "", trend: "" },
]
const Stats = () => {
    return (
        <>
            {
                data.map(({ average_value, average_value_count, curret_value, title, trend }, index) => {
                    return (
                        <div key={index} className="col-xxl-2 col-lg-4 col-md-6 leads-report-card">
                            <div className="card stretch stretch-full">
                                <div className="card-body">
                                    <div className="fs-12 fw-medium text-muted mb-3">{title}</div>
                                    <div className="hstack justify-content-between lh-base">
                                        <h3>
                                            <span className="counter">{average_value}</span>
                                            <span className='fs-6'>{average_value_count}</span>
                                        </h3>
                                        <div className={`hstack gap-2 fs-11 ${trend === "up" ? "text-success" : "text-danger"} `}>
                                            {/* <i className="fs-12">
                                                {
                                                    trend === "up" ?
                                                        <FiArrowUpCircle />
                                                        :
                                                        <FiArrowDownCircle />
                                                }
                                            </i> */}
                                            <span>{curret_value}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                )
            }
        </>
    )
}

export default Stats

