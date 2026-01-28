'use client';
import { useState } from 'react';
import {
    CallControls,
    CallParticipantsList,
    CallStatsButton,
    CallingState,
    PaginatedGridLayout,
    SpeakerLayout,
    useCall,
    useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList } from 'lucide-react';
import { useToast } from './ui/use-toast';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader';
import EndCallButton from './EndCallButton';
import { cn } from '@/lib/utils';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get('personal');
    const router = useRouter();
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
    const [showParticipants, setShowParticipants] = useState(false);
    const { useCallCallingState, useIsCallRecordingInProgress } = useCallStateHooks();
    const call = useCall();
    const { toast } = useToast();

    // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
    const callingState = useCallCallingState();
    const isRecording = useIsCallRecordingInProgress();

    if (callingState !== CallingState.JOINED && callingState !== CallingState.LEFT) return <Loader />;
    if (callingState === CallingState.LEFT) return null;

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />;
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="left" />;
            default:
                return <SpeakerLayout participantsBarPosition="right" />;
        }
    };

    return (
        <section className="relative h-screen w-full overflow-hidden pt-4 text-white bg-[#1c1f2e]">
            <div className="relative flex size-full items-center justify-center">
                <div className=" flex size-full max-w-[1000px] items-center">
                    <CallLayout />
                </div>
                <div
                    className={cn('h-[calc(100vh-86px)] hidden ml-2', {
                        'show-block': showParticipants,
                    })}
                >
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>
            {/* video layout and call controls */}
            <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap p-4 glassmorphism-dark">
                <CallControls onLeave={() => router.push(`/`)} />

                <DropdownMenu>
                    <div className="flex items-center">
                        <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
                            <LayoutList size={20} className="text-white" />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
                        {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
                            <div key={index}>
                                <DropdownMenuItem
                                    onClick={() =>
                                        setLayout(item.toLowerCase() as CallLayoutType)
                                    }
                                >
                                    {item}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="border-dark-1" />
                            </div>
                        ))}
                        <DropdownMenuSeparator className="border-dark-1" />
                        <DropdownMenuItem
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={async () => {
                                if (isRecording) {
                                    await call?.stopRecording();
                                    toast({ title: 'Recording Stopped' });
                                } else {
                                    await call?.startRecording();
                                    toast({ title: 'Recording Started' });
                                }
                            }}
                        >
                            {isRecording ? 'Stop Recording' : 'Start Recording'}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <CallStatsButton />
                <button onClick={() => setShowParticipants((prev) => !prev)}>
                    <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
                        <Users size={20} className="text-white" />
                    </div>
                </button>
                {!isPersonalRoom && <EndCallButton />}
            </div>
        </section>
    );
};

export default MeetingRoom;
