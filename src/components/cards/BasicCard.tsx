import { FC, ReactNode } from "react";

type Props = {
    title: string,
    children: ReactNode
}

const BasicCard: FC<Props> = ({ title, children }) => {

    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            {children}
        </div>
    );
};

export default BasicCard;