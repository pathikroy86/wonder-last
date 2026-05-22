import DestinationCard from "@/components/DestinationCard";

const DestinationPage = async () => {
    const res = await fetch('http://localhost:8000/destination');
    const data = await res.json();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
                data.map(destination => <DestinationCard key={destination._id} destination={destination}></DestinationCard>)
            }
        </div>
    );
};

export default DestinationPage;