import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {ModeToggle} from "@/components/mode-toggle";

export default function Navigation() {
    return (
        <>
            <div className="flex justify-between items-center">
                <NavigationMenu className="pt-4">
                    <NavigationMenuList>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Home
                            </NavigationMenuLink>
                        </Link>
                        <Link href="/lists" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Lists
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuList>
                </NavigationMenu>
                <ModeToggle/>
            </div>
        </>
    );
}