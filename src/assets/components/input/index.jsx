export const Input = ({name, label, ...props}) =>(
  <div className="flex flex-col">
    <label className="font-regular text-gray-500 text-sm pb-4 " htmlFor={name}>{label}</label>
    <input className="border rounded-[16px] border-gray-500 p-4 focus:outline outline-1 outline-red-300" {...props} name ={name} id={name}/>
  </div>
)