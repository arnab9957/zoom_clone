'use client';

import { ReactNode } from 'react';
import { Panel, Group, Separator } from 'react-resizable-panels';
import Sidebar from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const ResizableHomeLayout = ({ children }: { children: ReactNode }) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className="flex min-h-screen flex-1 flex-col bg-hero bg-cover bg-fixed bg-center bg-no-repeat px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
                <div className="w-full">{children}</div>
            </div>
        );
    }

    return (
        <Group orientation="horizontal" id="home-layout-sidebar">
            <Panel defaultSize={32} minSize={30} maxSize={isMobile ? 100 : 492} className="min-w-[200px] bg-dark-1 max-sm:!hidden max-sm:min-w-0">
                <Sidebar />
            </Panel>
            <Separator className="w-1 bg-dark-1 hover:bg-blue-1 transition-colors cursor-col-resize flex items-center justify-center max-sm:!hidden">
                <div className="h-4 w-1 bg-white/20 rounded-full" />
            </Separator>
            <Panel>
                <div className="flex min-h-screen flex-1 flex-col bg-hero bg-cover bg-fixed bg-center bg-no-repeat px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
                    <div className="w-full">{children}</div>
                </div>
            </Panel>
        </Group>
    );
};

export default ResizableHomeLayout;
