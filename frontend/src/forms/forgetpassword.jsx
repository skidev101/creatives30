
export default function ForgetPassword() {
 

    return (
        <section className="bg-black min-h-screen flex justify-center items-center pt-10 pb-10 font-poppins p-4">
            <div className="form-container lg:p-8 p-6 px-8 w-full max-w-md lg:max-w-2xl bg-[#51596C33]  text-sm font-sans text-white flex flex-col gap-6 rounded-lg shadow-md">
                <div className="logo-container mb-3 text-center font-bold font-poppins text-lg">
                    Recover Your Password
                </div>

      

                <form className="form flex flex-col gap-3 font-poppins">
                    <div className=" flex flex-col gap-1 ">
                        <label htmlFor="email" className="block">Email *</label>
                        <input
              type="email"
              className="w-full h-[50px] p-3 border text-sm  border-opacity-80 rounded-lg mb-4 border-[#a31621] focus:outline-none "
              placeholder="name@gmail.com"
            />
                    </div>


 
                    <div className="flex flex-col items-center justify-between flex-cols lg:flex-row mb-4 gap-4 pt-3">
<div className='lg:w-90 w-full order-2 lg:order-1'>
<button className="w-full text-[#a31621] ] font-semibold text-sm border border-[#fcf7f8] rounded-lg p-3">
    Cancel
  </button>
</div>
<div className='w-full pt-1 order-1 lg:order-2'>
<button className="mb-1 flex justify-center items-center text-white bg-[#a31621] border-none w-full py-3 px-4 rounded-md shadow-md ">
    Recover My Password
  </button>
</div>

</div>
                </form>

            
              
            </div>
        </section>
    );
}