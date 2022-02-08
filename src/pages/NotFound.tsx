import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { Layout } from "../components/Layout";


export const NotFound: NextPage = () => {
    const router = useRouter();
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center mx-5 gap-4 my-8 ">
                <h2 className="text-2xl font-bold">Page is Not Found</h2>
                <Image
                    src="/kai-mono__1_-removebg-preview.png"
                    alt="logo"
                    width={140}
                    height={140}
                />
                <p>情報が見つかりませんでした。再度やり直してください。</p>
                <button
                    onClick={() => router.push("/")}
                    className="inline-block px-3 lg:px-5 py-1 lg:py-2 bg-primary text-white rounded-lg"
                >
                    Home
                </button>
            </div>

        </Layout>
    )
}

export default NotFound;