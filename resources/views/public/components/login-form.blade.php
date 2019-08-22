<form 
    action="{{ route('login') }}"
    class="login-form"
    method="POST"> 
    @csrf

    <h2 class="login-form__title">Sign In</h2>
    <a class="login-form__create" href="{{ route('register') }}">Create Account</a>

    <section class="login-form__input--email input-container">
        <input 
            id="email" 
            type="email" 
            class="input @error('email') is-invalid @enderror" 
            name="email" 
            value="{{ old('email') }}" 
            required autocomplete="email"
            placeholder="E-mail Address"
            autofocus>
        <i class="material-icons input-icon">email</i>
        @error('email')
            <span class="invalid-feedback" role="alert">{{ $message }}</span>
        @enderror
    </section>

    <section class="login-form__input--password input-container">
        <input 
            id="password" 
            type="password" 
            class="input @error('password') is-invalid @enderror" 
            name="password" 
            value="{{ old('password') }}" 
            required autocomplete="password"
            placeholder="Password"
            autofocus>
        <i class="material-icons input-icon">lock</i>
            @error('password')
                <span class="invalid-feedback" role="alert">{{ $message }}</span>
            @enderror
    </section>

    <section class="login-form__checkbox--remember">
        <input class="" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
        <label class="" for="remember">
            {{ __('Remember Me') }}
        </label>
    </section>

    <button type="submit" class="login-form__login btn">
        {{ __('Login') }}
    </button>

    @if (Route::has('password.request'))
        <a class="login-form__forgot" href="{{ route('password.request') }}">
            {{ __('Forgot Your Password?') }}
        </a>
    @endif
</form>