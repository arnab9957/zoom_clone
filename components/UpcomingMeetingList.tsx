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
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white">Today&apos;s Upcoming Meetings</h2>

            {!todaysCalls || todaysCalls.length === 0 ? (
                <div className="glassmorphism-dark p-4 rounded-xl text-center text-white">
                    No meetings scheduled for today
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {todaysCalls.map((meeting: Call) => (
                        <div key={meeting.id} className="glassmorphism-dark flex items-center justify-between p-4 rounded-xl min-h-[80px]">
                            <div className="flex flex-col gap-1">
                                <p className="text-base font-semibold text-white">
                                    {meeting.state?.custom?.description || "No Description"}
                                </p>
                                <p className="text-sm text-gray-300">
                                    {meeting.state?.startsAt?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    {' - '}
                                    {(() => {
                                        // Estimate end time or just show start? Mockup shows range. 
                                        // Stream call might not have end time easily accessible in state if not custom.
                                        // We will just show start time for now or add 1 hour dummy.
                                        const start = meeting.state?.startsAt ? new Date(meeting.state.startsAt) : new Date();
                                        const end = new Date(start.getTime() + 60 * 60 * 1000);
                                        return end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                                    })()}
                                </p>
                            </div>

                            <Button
                                onClick={() => router.push(`/meeting/${meeting.id}`)}
                                className="bg-blue-1 rounded-lg px-6"
                            >
                                Join
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UpcomingMeetingList;
