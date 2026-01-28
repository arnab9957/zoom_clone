import Image from 'next/image';

const Loader = () => {
    return (
        <div className="flex-center h-screen w-full">
            <Image
                src="/icons/loading-circle.svg"
                alt="Loading..."
                width={50}
                height={50}
                loading="eager"
            />
        </div>
    );
};

export default Loader;
