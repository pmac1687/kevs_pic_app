    <form 
      className="w-full max-w-sm"
      method="post"
      onSubmit={event => {
        this.handleSubmit(event)
        navigate(`/app/profile`)
      }}
    >
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
            Username
          </label>
        </div>
        <div className="md:w-2/3">
          <input onChange={this.handleUpdate}  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="username" name="username" type="text" placeholder="Jane Doe" />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
            Password
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="password"
            type="password"
            name="password"
            onChange={this.handleUpdate}
            placeholder="******************"
          />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3" />
        <div className="md:w-2/3">
          <input
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
            value="Log In"
          />
        </div>
      </div>
      <div id='incorrect' style={{ display : 'none'}} className="md:flex md:items-center mb-6">
        <div style={{  marginLeft: '4vw' }} className="md:w-3/9">
          <label style={{ fontSize: '12px'}} className="block text-red-400 font-bold sm:text-right mb-1 sm:mb-0 pr-4" htmlFor="inline-password">
            Password or Username Incorrect Please Try Again
          </label>
        </div>
      </div>
    </form>



<h1>Log in</h1>
<form
  method="post"
  onSubmit={event => {
    this.handleSubmit(event)
    navigate(`/app/profile`)
  }}
>
  <label>
    Username
    <input type="text" name="username" onChange={this.handleUpdate} />
  </label>
  <label>
    Password
    <input
      type="password"
      name="password"
      onChange={this.handleUpdate}
    />
  </label>
  <input type="submit" value="Log In" />
</form>