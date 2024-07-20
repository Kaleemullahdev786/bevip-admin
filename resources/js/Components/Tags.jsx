export default function Tags({ type, text }) {
    return (
        <>
            {type === "active" ? (
                <span className="text-success px-3 py-1 border border-success rounded-full">
                    Active
                </span>
            ) : (
                <span className="text-danger px-3 py-1 border border-danger rounded-full">
                    Blocked
                </span>
            )}
        </>
    );
}
