<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitf1c0790686436d2f6cf535923063b76a
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitf1c0790686436d2f6cf535923063b76a::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitf1c0790686436d2f6cf535923063b76a::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitf1c0790686436d2f6cf535923063b76a::$classMap;

        }, null, ClassLoader::class);
    }
}