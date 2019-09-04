<header class="header">
    <a href="/">
        <img 
            src="logos/logo_color_400x90.png" 
            alt="FamilyMeal"
            class="header__logo" />
    </a>

    @guest
    <form 
        action="{{ route('login') }}"
        class="header__login-form"
        method="POST">
        @csrf

        <section class="login-form__input--email input-container">
            <input 
                id="email" 
                type="email" 
                class="header__input @error('email') is-invalid @enderror" 
                name="email" 
                value="{{ old('email') }}" 
                required autocomplete="email"
                placeholder="E-mail Address"
                autofocus>
            <i class="material-icons header__input-icon">email</i>
            @error('email')
                <span class="invalid-feedback" role="alert">{{ $message }}</span>
            @enderror
        </section>

        <section class="login-form__input--password input-container">
            <input 
                id="password" 
                type="password" 
                class="header__input @error('password') is-invalid @enderror" 
                name="password" 
                value="{{ old('password') }}" 
                required autocomplete="password"
                placeholder="Password"
                autofocus>
            <i class="material-icons header__input-icon">lock</i>
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

        <button type="submit" class="header__btn--secondary btn">
            {{ __('Login') }}
        </button>

        @if (Route::has('register'))
            <a class="header__btn--primary" href="{{ route('register') }}">{{ __('Sign Up') }}</a>
        @endif
    </form>
    @endguest
</header>