export default ({ name, handleVoiceSelect }) => {
    return (
        <li className="border" >
            <input onClick={handleVoiceSelect} type="button" value={name} className="w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" />
        </li>
    )
}
