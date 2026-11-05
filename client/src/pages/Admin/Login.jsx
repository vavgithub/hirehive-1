import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button } from '../../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { googleLogin, login } from '../../services/auth.service';
import useAuth from '../../hooks/useAuth';
import ForgotPassword from './ForgotPassword';
import { showErrorToast } from '../../components/ui/Toast';
import Loader from '../../components/Loaders/Loader';
import { InputField } from '../../components/Inputs/InputField';
import IconWrapper from '../../components/Cards/IconWrapper';
import { getRoute, ROUTE_KEY } from '../../config/permissions.config';
import { FcGoogle } from '@/components/geode/icons'
import { useAuthContext } from '../../context/AuthProvider';
import { GeodeLogo } from '@/components/geode/Logo';
import * as Sentry from '@sentry/react';

const Login = () => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { data: authData, isLoading: authLoading, refetch: refetchAuth } = useAuth();
    const { user, setUser , isDone , isLoading } = useAuthContext();

    useEffect(() => {
        if (authData?.role) {
            setUser(authData);
            navigate(getRoute(authData.role,ROUTE_KEY.DASHBOARD));
        }
    }, [authData, navigate]);

    useLayoutEffect(() => {
        if (user?.role) {
            navigate(getRoute(user.role,ROUTE_KEY.DASHBOARD));
        }
    },[user])

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
            await refetchAuth();
        },
        onError: (error) => {
            showErrorToast('Error' , error?.response?.data?.error || "Server error");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ email, password });
    };

    const registerGoogle = async () => {
        try {
          const result = await googleLogin()
          if(result?.authorizationUrl){
            window.location.href = result.authorizationUrl;
          }
        } catch (error) {
          Sentry.captureException(error, {
            tags: { file: "Login.jsx", action: "registerGoogle", role: "admin" },
            extra: { response: error?.response?.data },
          });
          showErrorToast('Error',error?.message)
        }
    }

    if (!isDone || isLoading ) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader />
            </div>
        );
    }else {
        return (
            <div className="flex min-h-screen items-center justify-center bg-muted p-6">
                <div className="w-full max-w-sm rounded-lg border bg-card p-6 text-card-foreground">
                    {showForgotPassword ? (
                        <ForgotPassword onBack={() => setShowForgotPassword(false)} />
                    ) : (
                        <>
                            <div className="mb-6 flex justify-center">
                                <GeodeLogo />
                            </div>
                            <h1 className="mb-2 text-center text-2xl font-medium">Welcome Back</h1>
                            <p className="mb-6 text-center text-sm text-muted-foreground">
                                Login to your account below
                            </p>
                            <Button type="button" variant="white" className="w-full" onClick={registerGoogle}>
                                <IconWrapper icon={FcGoogle} />
                                Continue With Google
                            </Button>
                            <div className="my-6 flex items-center">
                                <hr className="flex-grow border-border" />
                                <span className="px-3 text-sm text-muted-foreground">OR</span>
                                <hr className="flex-grow border-border" />
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <InputField
                                        id="login-email"
                                        type="email"
                                        label="Email"
                                        extraClass="custom-input"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <InputField
                                        id="login-password"
                                        type="password"
                                        label="Password"
                                        extraClass="custom-input"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <span
                                        onClick={() => setShowForgotPassword(true)}
                                        className="mb-6 mt-2 block cursor-pointer text-sm text-foreground hover:underline"
                                    >
                                        Forgot Password?
                                    </span>
                                </div>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full"
                                    disabled={mutation.isPending}
                                >
                                    {mutation.isPending ? 'Logging in...' : 'Login'}
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        );
    }

};

export default Login;