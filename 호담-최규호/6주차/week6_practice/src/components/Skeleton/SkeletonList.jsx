import SkeletonUI from "./SkeletonUI";

const SkeletonList = ({number}) => {
    return (
        new Array(number).fill(0).map((_, idx) => <SkeletonUI key={idx} />)
    );
};

export default SkeletonList;