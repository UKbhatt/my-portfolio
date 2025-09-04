import { CometCard } from "@/components/ui/comet-card";
import profile from "../../public/logo1.jpg"
import Image from "next/image";

export function CometCardDemo() {
    return (
        <div className="pt-20">
            <CometCard>
                <button
                    type="button"
                    className="flex w-80 cursor-pointer flex-col items-stretch rounded-[16px]"
                >
                    <div className="relative mt-2 aspect-[3/4] w-full overflow-hidden rounded-lg">
                        <Image
                            src={profile}
                            alt="Profile"

                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                </button>
            </CometCard>
        </div>

    );
}
