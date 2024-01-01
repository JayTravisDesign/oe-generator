// Ensure the file is imported or rendered within a file marked with `use client` or in a component marked with `use client`
"use client";

import axios from "axios";
import * as z from "zod";
import { VideoIcon } from "lucide-react"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";  
//import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { useState } from "react";

import { Heading } from "@/components/heading";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
//import { UserAvatar } from "@/components/user-avatar";
//import { BotAvatar } from "@/components/bot-avatar";
//import { cn } from "@/lib/utils";

import { formSchema } from "./constants";

const VideoPage = () => {
    const router = useRouter();
    const [video, setVideo] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined);
            
            const response = await axios.post("/api/video", values);

            setVideo(response.data[0]);
            form.reset();
        } catch (error: any) { 
            console.log(error);
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading 
                title="Video"
                description="Turn your prompt into video."
                icon={VideoIcon}
                iconColor="text-orange-700"
                bgColor="bg-orange-700/10"
            />
            <div className="spx-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="
                                rounded-lg
                                border
                                w-full
                                p-4
                                px-3
                                md:px-6
                                focus-within:shadow-sm
                                grid
                                grid-cols-12
                                gap-12
                            "
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input 
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Clown fish swimming around a coral reef"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-5">
                    {isLoading && (
                        <div className="p-8 rounted-lg w-full flex items-cemter justify-center bg-muted">
                        <Loader />
                        </div>
                    )}
                    {!video && !isLoading && (
                        <Empty label="No video generated."/>
                    )}
                    {video && (
                        <video className="w-full aspect-video mt-8 rounded-lg border bg-black" controls>
                            <source src={video}/>
                        </video>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoPage;

