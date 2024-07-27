export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="input--container">
                <div className="heading text-2xl font-medium">Authenticate yourself to be able to save your data</div>
                <div className="input--content mt-8 max-w-[400px] mx-auto text-sm font-medium text-neutral-700">
                    <div className="first--name--input">
                        <div>First Name</div>
                        <input className="mt-1 w-full border rounded-lg focus:border-blue-600 px-4 py-2 outline-none" type="text" placeholder="John" />
                    </div>
                    <div className="last--name--input mt-4">
                        <div>Last Name</div>
                        <input className="mt-1 w-full border rounded-lg focus:border-blue-600 px-4 py-2 outline-none" type="text" placeholder="Doe" />
                    </div>
                    <div className="email--input mt-4">
                        <div>Email</div>
                        <input className="mt-1 w-full border rounded-lg focus:border-blue-600 px-4 py-2 outline-none" type="text" placeholder="johndoe@somewebsite.com" />
                    </div>
                    <div className="password--input mt-4">
                        <div>Password</div>
                        <input className="mt-1 w-full border rounded-lg focus:border-blue-600 px-4 py-2 outline-none" type="password" placeholder="aStr0ngpw" />
                    </div>
                </div>
            </div>
        </div>
    )
}
