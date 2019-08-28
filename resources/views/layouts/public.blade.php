<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Recipe Confidential') }}</title>
    <script src="{{ asset('js/app.js') }}"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div class="app">
        @include('public/components/header')
        <main class="main">
            @yield('content')
        </main>
        @include('public/components/footer')
        @include('public/components/bg')
    </div>
    <link href="{{ asset('js/public/app.js') }}" rel="stylesheet">
</body>
</html>
