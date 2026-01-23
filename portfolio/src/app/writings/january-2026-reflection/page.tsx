'use client';

import Image from "next/image";

export default function January2026Reflection() {
  return (
    <article style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem 1rem',
      lineHeight: '1.8',
      fontSize: '1.05rem'
    }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>January 2026 Reflection</h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: 'bold' }}>First Month of 2026!</h2>
        <p style={{ marginBottom: '1rem' }}>
          My January has been pretty thrilling.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          When I first received my Google offer last month and another offer for summer, I thought I'd be coasting for the rest of the school year. After some reflection, the company I was going to intern for during the summer was not going to provide me learning opportunities or make my resume better. I'd purely be doing it for the money, and while it is nice to have money while in college I want to maximize learning now so I can be a GOATed engineer.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          So I've been messaging startup founders and other smaller teams which have huge potential in hopes that they have summer internships open. Funnily enough, a YC-backed founder messaged me for a chat about a potential internship initially off of a connection request since he saw I didn't have a summer internship; having Google on my LinkedIn profile definitely helped me (lol). I've also gotten one process for a big tech company that I'd like to work for but I wouldn't mind if that ended up in a rejection.
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: 'bold' }}>NYC Stealth Startup</h2>
        <p style={{ marginBottom: '1rem' }}>
          I've always thought it was funny when people say they're building in stealth since most of them are just projects that college students claim to work for/found to look better on their LinkedIn profile, but obviously I was aware of the real builders in stealth.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          I actually messaged someone off of Twitter that I know has a really great founding team, and he set up a call for me the day after. I was then redirected to call the director of engineering at the startup and now they're flying me out to do a work trial in NYC in February.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          This is the first time something like this has happened to me, I'm definitely excited but I'm sure I will be nervous as well. I've been doing some studying based on what they told me about their tech stack so I can build quickly and hopefully impress. I've been utilizing Claude Code + Cursor to build my senior design project which I actually finished in a day. It's crazy what AI can do now and schools still aren't adjusting for that change yet.
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: 'bold' }}>Coffee Chats & Advice</h2>
        <p style={{ marginBottom: '1rem' }}>
          Given my recruiting experience I've received multiple messages about people wanting to chat with me about my experiences. It's weird because I never had this before but I understand why, though I feel somewhat unqualified to give advice because I'm just a student and just got an internship.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          In my coffee chats I do try to be as honest as possible and push the fact that I got an offer just based on luck but capitalizing off of the luck. I do emphasize that being prepared is super important; I'm really not cut out for mentoring or offering advice in coffee chats. I've spent the latter half of my life grinding Fortnite and Valorant, so having people that want to learn from me is a bit awkward.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          I feel like that is the last thing anyone searching for an internship wants to hear is that I just got lucky, but I don't really know what to say other than that because it is the truth.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          On a better note, someone I know who graduated in 2023 messaged me and I helped him land a job since he hasn't been able to find one since he graduated. I obviously don't think my advice was the main factor but it feels nice knowing that I assisted in someone landing a job when they lost hope.
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: 'bold' }}>Miscellaneous</h2>
        <p style={{ marginBottom: '1rem' }}>
          I've been playing so much Minecraft. I'm lowkey addicted again. Here's a picture of one of the builds :P
        </p>
      </div>

      <div style={{ margin: '2rem 0', textAlign: 'center' }}>
        <Image
          src="/writings/january-2026-reflection/image1.jpg"
          alt=""
          width={700}
          height={500}
          style={{
            maxWidth: '700px',
            width: '100%',
            height: 'auto',
            borderRadius: '8px'
          }}
        />
      </div>
    </article>
  );
}
