import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const Wrapper = (props: Props) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-800">
        <div className=" py-8 px-8 bg-slate-300 rounded-md shadow-lg sha shadow-slate-500 ">
            {props.children}
        </div>
    </div>
  )
}

export default Wrapper