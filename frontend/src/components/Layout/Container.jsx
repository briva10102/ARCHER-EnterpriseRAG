function Container({ children, className = "" }) {
    return (
        <div
            className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 ${className}`}
        >
            {children}
        </div>
    );
}

export default Container;