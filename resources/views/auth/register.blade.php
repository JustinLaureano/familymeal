@extends('layouts.public')

@section('content')
<section class="login">
    <form 
        action="{{ route('register') }}"
        class="register-form"
        method="POST"> 
        @csrf

        <h2 class="register-form__title">Sign Up</h2>
        <a class="register-form__login" href="{{ route('login') }}">Login</a>

        <section class="register-form__input--name input-container">
            <input 
                id="name" 
                type="name" 
                class="input @error('name') is-invalid @enderror" 
                name="name" 
                value="{{ old('name') }}" 
                required autocomplete="name"
                placeholder="Name"
                autofocus>
            <i class="material-icons input-icon">person</i>
                @error('name')
                    <span class="invalid-feedback" role="alert">{{ $message }}</span>
                @enderror
        </section>

        <section class="register-form__input--email input-container">
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

        <section class="register-form__input--password input-container">
            <input 
                id="password" 
                type="password" 
                class="input @error('password') is-invalid @enderror" 
                name="password" 
                value="{{ old('password') }}" 
                required autocomplete="new-password"
                placeholder="Password"
                autofocus>
            <i class="material-icons input-icon">lock</i>
                @error('password')
                    <span class="invalid-feedback" role="alert">{{ $message }}</span>
                @enderror
        </section>

        <section class="register-form__input--password-confirmation input-container">
            <input 
                id="password_confirmation" 
                type="password_confirmation" 
                class="input @error('password_confirmation') is-invalid @enderror" 
                name="password_confirmation" 
                value="{{ old('password_confirmation') }}" 
                required autocomplete="new-password"
                placeholder="Confirm Password"
                autofocus>
            <i class="material-icons input-icon">lock_open</i>
                @error('password_confirmation')
                    <span class="invalid-feedback" role="alert">{{ $message }}</span>
                @enderror
        </section>

        <button type="submit" class="register-form__create btn">
            {{ __('Create Account') }}
        </button>

    </form>
</section>
@endsection