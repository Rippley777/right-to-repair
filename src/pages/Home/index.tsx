import Blocks from "./components/blocks";
import Header from "./components/header";
import Hero from "./components/hero";
import Portals from "./components/portals";

function Home() {
  return (
    <div
      className="relative flex size-full min-h-screen w-screen flex-col bg-[#111418] dark justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: "Inter, 'Noto Sans', sans-serif" }}
    >
      <div>
        <Header />
        <Hero />
        <Blocks />
        <Portals />

        <div className="flex items-center gap-4 bg-[#111418] px-4 min-h-14 justify-between">
          <p className="text-white text-base font-normal leading-normal flex-1 truncate">
            See all features
          </p>
          <div className="shrink-0">
            <div
              className="text-white flex size-7 items-center justify-center"
              data-icon="ArrowRight"
              data-size="24px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div>
        <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
          <p className="text-[#9dabb8] text-base font-normal leading-normal">
            © 2025 RIP Repairs, LLC. All rights reserved.
          </p>
        </footer>
        <div className="h-5 bg-[#111418]"></div>
      </div>
    </div>
  );
}
// WE’RE DONE PLAYING NICE.

// Tired of being told you can’t fix your own stuff? Fed up with manufacturers locking you out of your own devices, hiding parts, and shoving planned obsolescence down your throat? We are too.

// This isn’t just a website. This is a call to arms. A rallying cry for every repair geek, tinker wizard, and sustainability warrior out there. It’s time to fight back, reduce e-waste, and stick it to the corporations that think they own everything you buy.

// Here’s What We’re Packing:
// 💥 Marketplace: Fight the Waste, Trade the Parts
// Buy, sell, and swap gear like your life depends on it—because the planet kind of does. Need a rare part for your MacBook Frankenstein project? Got a drawer full of old GPUs to unload? This is your battlefield.

// 🔥 Blog: No Fluff, Just Fixes and Fights
// This isn’t your grandma’s blog. We’re dropping truth bombs about shady corporate practices, serving up step-by-step repair guides, and shining a spotlight on the rebels pushing the right-to-repair movement forward.

// 🤘 Community Forums: Raise Hell Together
// We’ve built a space where you can rant, rave, troubleshoot, and plot with people who actually get it. Need to vent about another glue-filled nightmare of a device? We’re here for it. Got advice on fixing what “can’t” be fixed? Share it loud and proud.

// 💡 Special Interest Groups: Build Your Army
// From retro console modders to EV hackers, find your people or start your own crew. Whether you’re advocating for new repair laws or just geeking out about circuit boards, this is your place to connect, strategize, and take action.

// Why We’re Angry (and You Should Be Too):
// Every year, millions of perfectly good devices are trashed because greedy corporations make them impossible to repair. This is deliberate. They profit while the planet burns.

// But not anymore. Every device you repair flips the bird to planned obsolescence. Every part you reuse says, “Not today, landfill.” Every voice raised demands a better, fairer, less wasteful world.

// What Are You Waiting For?
// Storm the Marketplace: Get what you need to repair, swap, or rebuild.
// Read the Blog: Fuel your fire with fixes and exposés.
// Join the Forums: Connect, commiserate, and collaborate.
// Start a Group: Rally your troops and raise hell.
// Join the Movement. Smash the System. Fix the Future.
// RepairRight isn’t just about fixing gadgets. It’s about fixing the system. It’s about taking back control and making corporations pay for the mess they’ve created.

// The revolution starts now. Let’s burn their barriers down—one repair at a time.

// Join the Fight.

export default Home;
