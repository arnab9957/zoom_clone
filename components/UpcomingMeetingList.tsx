'use client';

import { useGetCalls } from '@/hooks/useGetCalls';
import { Call } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import { Button } from './ui/button';

const UpcomingMeetingList = () => {
    const { upcomingCalls, isLoading } = useGetCalls();
    const router = useRouter();

    if (isLoading) return <Loader className="animate-spin text-white" />;

    const displayedCalls = upcomingCalls?.slice(0, 3); // Show top 3 for dashboard
    // Or filter for today? Mockup says "Today's Upcoming Meetings"
    // Let's filter for today:
    const now = new Date();
    const todaysCalls = upcomingCalls?.filter((call: Call) => {
        if (!call.state?.startsAt) return false;
        const callDate = new Date(call.state.startsAt);
        return callDate.getDate() === now.getDate() &&
            callDate.getMonth() === now.getMonth() &&
            callDate.getFullYear() === now.getFullYear();
    });

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Upcoming Meetings</h2>
                <p className="text-sm font-medium text-sky-1 cursor-pointer">View All &gt;</p>
            </div>

            {!displayedCalls || displayedCalls.length === 0 ? (
                <div className="flex items-center justify-center h-[150px] glassmorphism-dark rounded-xl text-center text-white">
                    No meetings scheduled
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {displayedCalls.map((meeting: Call) => {
                        const start = meeting.state?.startsAt ? new Date(meeting.state.startsAt) : new Date();
                        const isToday = start.getDate() === now.getDate();
                        const badgeText = isToday ? 'Today' : 'Tomorrow'; // Simplified logic
                        const badgeColor = isToday ? 'bg-orange-1' : 'bg-blue-1';

                        return (
                            <div key={meeting.id} className="glassmorphism-dark flex items-center justify-between p-4 rounded-xl min-h-[80px]">
                                <div className="flex gap-4 items-center">
                                    <div className="size-10 rounded-full bg-orange-1 flex-center">
                                        <img src="/icons/Video.svg" alt="video" width={20} height={20} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-base font-semibold text-white">
                                            {meeting.state?.custom?.description || "Team Sync"}
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            {start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                            {' '}
                                            {badgeText}
                                        </p>
                                    </div>
                                </div>

                                <div className={`rounded-full px-4 py-1.5 ${badgeColor}`}>
                                    <p className="text-xs font-semibold text-white">{badgeText} &gt;</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default UpcomingMeetingList;
