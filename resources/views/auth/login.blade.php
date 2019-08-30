@extends('layouts.public')

@section('content')
<section class="login">
    <section class="login__caption">
        <h1 class="login__title">Recipe Confidential</h1>
        <p class="login__subtitle">Keep all your recipes safe in one place.</p>
    </section>

    @include('public/components/login-form')
</section>
@endsection
