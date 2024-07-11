import { Divider } from '@/components/divider'
import Section from '@/components/section'
import { ModeToggle } from '@/components/themeToggle'

const Story = () => (
    <Section>
        <h2 className='text-xl font-semibold'>Settings</h2>
        <div className='mt-2'>
            <h3 className='text-md font-medium mb-2'>Theme</h3>
            <ModeToggle />
        </div>
        <Divider className='my-8'/>
        <h2 className='text-xl font-semibold'>About</h2>
        <div className='mt-2 text-zinc-600 dark:text-zinc-400 space-y-4'>
            <p>
                Hia 👋
            </p>
            <p>
                I&apos;m Amory, a software engineer based in the UK. I love building things and learning new technologies. I&apos;m currently working on a few projects, including this one.
            </p>
            <p>
                The website was inspired by <a href='https://www.yenny.app/' className='text-purple-600'>kayladotdev&apos;s Yenny</a>, adding support for additional languages.
            </p>
            <p>
                This project is built using Next.js with TypeScript, Tailwind CSS, and PWA support.
                It was bootstrapped with <a href='https://github.com/mvllow/next-pwa-template/blob/main/pages/story.tsx' className='text-purple-600'>mvllow&apos;s Next.js PWA Template.</a> 
            </p>
        </div>
    </Section>
)

export default Story