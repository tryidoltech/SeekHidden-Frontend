import React from 'react'
import LoginForm from '@/components/authentication/LoginForm'

const LoginMinimal = () => {
    return (
        <main className="auth-minimal-wrapper">
            <div className="auth-minimal-inner">
                <div className="minimal-card-wrapper">
                    <div className="card mb-4 mt-5 mx-4 mx-sm-0 position-relative">
                        <div className="card-body p-sm-5">
                            <LoginForm registerPath={"/authentication/register/minimal"} resetPath={"/authentication/reset/minimal"} />
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default LoginMinimal