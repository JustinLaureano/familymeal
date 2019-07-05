<header class="header">
    <a href="/">
        <img 
            src="logos/rp_logo_color_400x100.png" 
            alt="Recipe Confidential"
            class="header__logo" />
    </a>

    <section class="header__links">
        @guest
            <a class="header__link" href="{{ route('login') }}">{{ __('Login') }}</a>

            @if (Route::has('register'))
                <a class="header__link--outline" href="{{ route('register') }}">{{ __('Sign Up') }}</a>
            @endif
        @endguest
    </section>
</header>