export default function Home() {
  return (
    <main className="bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 h-screen flex items-center justify-center p-5">
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col md:flex-row gap-2 *:outline-none ring ring-transparent transition-shadow has-[:invalid]:ring-red-100">
        <input
          className="w-full rounded-full h-10 bg-gray-200 pl-5 ring ring-transparent focus:ring-green-500 focus:ring-offset-2 transition-shadow placeholder:drop-shadow invalid:focus:ring-red-500 peer"
          type="text"
          required
          placeholder="이메일 주소 입력"
        />
        <span className="text-red-500 font-medium hidden peer-invalid:block">
          이메일 주소를 입력하세요.
        </span>
        <button className="text-white py-2 rounded-full active:scale-90 transition-transform font-medium md:px-10 bg-black">
          로그인
        </button>
      </div>
    </main>
  );
}
