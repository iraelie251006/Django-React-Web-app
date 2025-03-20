function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        <div className="p-2.5 my-5 border-2 rounded-[5px]">
            <p className="text-slate-800 font-bold">{note.title}</p>
            <p className="text-slate-500">{note.content}</p>
            <p className="text-slate-800 text-xs">{formattedDate}</p>
            <button className="bg-red-500 text-white border-none cursor-pointer rounded-[5px] py-2.5 px-5 hover:bg-red-700 transition duration-500 ease-in-out" onClick={() => onDelete(note.id)}>
                Delete
            </button>
        </div>
    );
}

export default Note