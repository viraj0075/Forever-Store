import type { TitleType } from "../Types/TitleType";

const Title = ({ text1, text2 }: TitleType) => {
    return (
        <div className="inline-flex items-center gap-2 mb-3">
            <p className="text-gray-500">{text1} <span className="text-gray-700 font-medium">{text2}</span></p>
            <p className="w-8 md:w-15 h-px bg-gray-700 md:block hidden" />
        </div>
    )
}
export default Title;