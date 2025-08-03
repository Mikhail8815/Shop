import { useEffect } from "react";
import { subscribeToAuth } from "./authService";
import { setUser, setStatus } from "./authSlice";
import {useAppDispatch} from "../../hooks.ts";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setStatus("loading"));

        const unsubscribe = subscribeToAuth((user) => {
            dispatch(setUser(user));
            dispatch(setStatus("succeeded"));
        });

        return () => unsubscribe();
    }, [dispatch]);

    return <>{children}</>;
};