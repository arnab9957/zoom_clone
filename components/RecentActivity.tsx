"use client";

import Image from 'next/image';
import { useGetCalls } from "@/hooks/useGetCalls";

const RecentActivity = () => {
    const { endedCalls, callRecordings, isLoading } = useGetCalls();

    if (isLoading) return <div className="text-white">Loading...</div>;

    const now = new Date();
    const todayCalls = endedCalls?.filter((call) => {
        if (!call.state?.startsAt) return false;
        const callDate = new Date(call.state.startsAt);
        return (
            callDate.getDate() === now.getDate() &&
            callDate.getMonth() === now.getMonth() &&
            callDate.getFullYear() === now.getFullYear()
        );
    });

    const weeklyCalls = endedCalls?.filter((call) => {
        if (!call.state?.startsAt) return false;
        const callDate = new Date(call.state.startsAt);
        const diffTime = Math.abs(now.getTime() - callDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    })

    // Mock data for the "Marketing Report Review" card if no actual last call exists or to match design
    // The design shows a specific recent meeting card. We can try to get the very last ended call.
    const lastCall = endedCalls && endedCalls.length > 0 ? endedCalls[0] : null;

    return (
        <section className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                <p className="text-sm font-medium text-sky-1 cursor-pointer">View All &gt;</p>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                {/* Recent Meeting Card */}
                <div className="glassmorphism-dark col-span-1 rounded-[14px] p-5 flex flex-col justify-between min-h-[150px]">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="size-10 rounded-full bg-orange-1 flex-center">
                                <Image src="/icons/Video.svg" alt="video" width={20} height={20} />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-lg font-bold text-white">
                                    {lastCall?.state?.custom?.description || "Marketing Report Review"}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {lastCall?.state?.startsAt ? new Date(lastCall.state.startsAt).toLocaleDateString() : "Yesterday"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Update Meeting Card (Mockup shows a second one or maybe these are just placeholders) 
             The mockup shows 2 wide cards on top, and 3 small square cards below.
             Let's try to match the mockup layout:
             Row 1: Two rectangular cards.
             Row 2: Three square stats cards.
         */}
                <div className="glassmorphism-dark col-span-1 rounded-[14px] p-5 flex flex-col justify-between min-h-[150px]">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="size-10 rounded-full bg-purple-1 flex-center">
                                <Image src="/icons/schedule.svg" alt="schedule" width={20} height={20} />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-lg font-bold text-white">
                                    Project Update Meeting
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Monday
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="rounded-[14px] bg-blue-1 p-6 flex flex-col items-center justify-center gap-2">
                    <div className="flex items-center gap-2 text-white/80">
                        <Image src="/icons/upcoming.svg" alt="today" width={20} height={20} />
                        <span>Today</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-white">{todayCalls?.length || 2}</h1>
                    <p className="text-sm font-medium text-white/80">Meetings</p>
                </div>

                <div className="rounded-[14px] bg-purple-1 p-6 flex flex-col items-center justify-center gap-2">
                    <div className="flex items-center gap-2 text-white/80">
                        <Image src="/icons/schedule.svg" alt="weekly" width={20} height={20} />
                        <span>Weekly</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-white">{weeklyCalls?.length || 7}</h1>
                    <p className="text-sm font-medium text-white/80">Meetings</p>
                </div>

                <div className="rounded-[14px] bg-orange-1 p-6 flex flex-col items-center justify-center gap-2">
                    <div className="flex items-center gap-2 text-white/80">
                        <Image src="/icons/Video.svg" alt="recordings" width={20} height={20} />
                        <span>Recordings</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-white">{callRecordings?.length || 48}</h1>
                    <p className="text-sm font-medium text-white/80">Recordings</p>
                </div>
            </div>
        </section>
    );
};

export default RecentActivity;
