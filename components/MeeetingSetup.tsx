'use client';
import { useEffect, useState } from 'react';
import {
    DeviceSettings,
    VideoPreview,
    useCall,
    useCallStateHooks,
} from '@stream-io/video-react-sdk';

import { Alert, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import Image from 'next/image';

const MeetingSetup = ({
    setIsSetupComplete,
}: {
    setIsSetupComplete: (value: boolean) => void;
}) => {
    // https://getstream.io/video/docs/react/guides/call-and-participant-state/#call-state
    const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
    const callStartsAt = useCallStartsAt();
    const callEndedAt = useCallEndedAt();
    const callTimeNotArrived =
        callStartsAt && new Date(callStartsAt) > new Date();
    const callHasEnded = !!callEndedAt;

    const call = useCall();

    if (!call) {
        throw new Error(
            'useStreamCall must be used within a StreamCall component.',
        );
    }

    // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
    const [isMicCamToggled, setIsMicCamToggled] = useState(false);

    useEffect(() => {
        if (isMicCamToggled) {
            call?.camera.disable();
            call?.microphone.disable();
        } else {
            call?.camera.enable().catch((err) => {
                console.warn("Retrying camera enable due to:", err);
            });
            call?.microphone.enable().catch((err) => {
                console.warn("Retrying mic enable due to:", err);
            });
        }
    }, [isMicCamToggled, call?.camera, call?.microphone]);

    if (callTimeNotArrived)
        return (
            <Alert>
                <AlertTitle>
                    Your Meeting has not started yet. It is scheduled for {callStartsAt.toLocaleString()}
                </AlertTitle>
            </Alert>
        );

    if (callHasEnded)
        return (
            <Alert>
                <Image
                    src="/icons/call-ended.svg"
                    alt="Call ended"
                    width={16}
                    height={16}
                />
                <AlertTitle>
                    The call has been ended by the host
                </AlertTitle>
            </Alert>
        );

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white bg-[#1c1f2e]">
            <h1 className="text-center text-2xl font-bold">Setup</h1>
            <VideoPreview />
            <div className="flex h-16 items-center justify-center gap-3">
                <label className="flex items-center justify-center gap-2 font-medium">
                    <input
                        type="checkbox"
                        checked={isMicCamToggled}
                        onChange={(e) => setIsMicCamToggled(e.target.checked)}
                    />
                    Join with mic and camera off
                </label>
                <DeviceSettings />
            </div>
            <Button
                className="rounded-md bg-green-500 px-4 py-2.5"
                onClick={() => {
                    call.join();

                    setIsSetupComplete(true);
                }}
            >
                Join meeting
            </Button>
        </div>
    );
};

export default MeetingSetup;
