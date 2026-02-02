import MeetingTypeList from "@/components/MeetingTypeList";
import UpcomingMeetingList from "@/components/UpcomingMeetingList";
import RecentActivity from "@/components/RecentActivity";
import TodoList from "@/components/TodoList";

const Home = () => {
  const now = new Date();

  // Format time/date to match mockup: "9:57 AM", "Wednesday, January 28, 2026"
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

  return (
    <section className="flex size-auto flex-col gap-5 text-white">
      {/* Top Section with Background */}
      {/* Top Section */}
      <div className="flex flex-col gap-5 rounded-[20px] px-5 py-8 lg:p-11">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold lg:text-4xl">Good morning!</h2>
          <h1 className="text-5xl font-extrabold lg:text-7xl">{time}</h1>
          <p className="text-lg font-medium text-sky-1 lg:text-xl">{date}</p>
        </div>

        <MeetingTypeList />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="flex flex-col gap-5">
          <UpcomingMeetingList />
          <TodoList />
        </div>
        <RecentActivity />
      </div>
    </section>
  );
};

export default Home;
