@extends('layouts.public')

@section('content')
<div class="welcome">
    <section class="welcome__main-card">
        <div class="welcome__caption">
            <img 
                src="logos/rp_logo_color_400x100.png" 
                alt="Recipe Confidential"
                class="header__logo" />
            <p>All your personal recipes in one place</p>
        </div>
        @include('public/components/login-form')
    </section>
</div>
@endsection
