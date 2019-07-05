@extends('layouts.public')

@section('content')
<div class="">
    <div class="card-header">{{ __('Login') }}</div>

    <form method="POST" action="{{ route('login') }}">
        @csrf
        <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>
        <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
        @error('email')
            <span class="invalid-feedback" role="alert">{{ $message }}</span>
        @enderror

        <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>
        <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
        @error('password')
            <span class="invalid-feedback" role="alert">{{ $message }}</span>
        @enderror

        <input class="" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
        <label class="" for="remember">
            {{ __('Remember Me') }}
        </label>

        <button type="submit" class="btn">
            {{ __('Login') }}
        </button>

        @if (Route::has('password.request'))
            <a class="btn" href="{{ route('password.request') }}">
                {{ __('Forgot Your Password?') }}
            </a>
        @endif
    </form>
</div>
@endsection
