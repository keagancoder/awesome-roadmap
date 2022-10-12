import { Component, ReactNode } from 'react';
declare type ErrorBoundaryState = {
    hasError: boolean;
    error: Error | null;
};
export default class ErrorBoundary extends Component<{
    fallback: NonNullable<ReactNode> | null;
}, ErrorBoundaryState> {
    state: {
        hasError: boolean;
        error: null;
    };
    static getDerivedStateFromError(error: Record<string, any>): {
        hasError: boolean;
        error: Record<string, any>;
    };
    render(): {} | null | undefined;
}
export {};
