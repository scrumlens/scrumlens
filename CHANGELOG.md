# [0.9.0](https://github.com/scrumlens/scrumlens/compare/v0.8.0...v0.9.0) (2024-08-24)


### Features

* **client:** add comments to note ([#22](https://github.com/scrumlens/scrumlens/issues/22)) ([9a5f2bb](https://github.com/scrumlens/scrumlens/commit/9a5f2bb2080152b70b9a33d8c143694470e22edb))
* **server:** add comments api ([#21](https://github.com/scrumlens/scrumlens/issues/21)) ([167bedc](https://github.com/scrumlens/scrumlens/commit/167bedcd3a28ade74006e2eb57534f467ab9993e))



# [0.8.0](https://github.com/scrumlens/scrumlens/compare/v0.7.0...v0.8.0) (2024-08-23)


### Bug Fixes

* **client:** update private in edit board dialog ([659f249](https://github.com/scrumlens/scrumlens/commit/659f24909797b467d4b03e3d006e839f49e21702))


### Features

* **client:** add error page ([8b340a6](https://github.com/scrumlens/scrumlens/commit/8b340a6bb1f05d07fc24d030000bf8f7d016df46))
* **client:** add scroll into create note form ([cfbf6e9](https://github.com/scrumlens/scrumlens/commit/cfbf6e9450d7235cc97306d16cf9bbd2fc483d72))
* add email templates ([#20](https://github.com/scrumlens/scrumlens/issues/20)) ([a375a40](https://github.com/scrumlens/scrumlens/commit/a375a404a5b2e61142a9a469178deb55e31c9c76))



# [0.7.0](https://github.com/scrumlens/scrumlens/compare/v0.6.0...v0.7.0) (2024-08-18)


### Features

* **client:** add init gifs ([ca4696c](https://github.com/scrumlens/scrumlens/commit/ca4696ce2e8ce4f7e998931c97aa61192db595ca))
* **client:** add poll ([df15a61](https://github.com/scrumlens/scrumlens/commit/df15a61766e7b2650d6a1bf30db1f6acce9b1267))
* **server:** add polls api ([c2da899](https://github.com/scrumlens/scrumlens/commit/c2da899fa946a8404784fb88e23c3be73b46679e))



# [0.6.0](https://github.com/scrumlens/scrumlens/compare/v0.5.0...v0.6.0) (2024-08-16)


### Features

* **client, server:** decrease min length to 2 in user name ([292744f](https://github.com/scrumlens/scrumlens/commit/292744fa30824a726f055003070770be663c7700))
* **client, sever:** add gif ([#18](https://github.com/scrumlens/scrumlens/issues/18)) ([ef70027](https://github.com/scrumlens/scrumlens/commit/ef70027ef5d760d74c714c068f3b76f5fb12f751))



# [0.5.0](https://github.com/scrumlens/scrumlens/compare/v0.4.0...v0.5.0) (2024-08-15)


### Bug Fixes

* **client:** redirect to dashboard ([1277acb](https://github.com/scrumlens/scrumlens/commit/1277acb4db0d74d2f2d95da1c674607f0719010f))


### Features

* **client:** add board lock ([#17](https://github.com/scrumlens/scrumlens/issues/17)) ([aa8c923](https://github.com/scrumlens/scrumlens/commit/aa8c923855d3a65ec06fa52be1d593d47c391d5d))
* **client:** add copy board link in dashboard ([321706f](https://github.com/scrumlens/scrumlens/commit/321706fd56644021693cc953247068c3734af2a6))
* **client:** add invite to private board ([3aa79ec](https://github.com/scrumlens/scrumlens/commit/3aa79ec9f7f0b957c201c2b7fe6bd78699674093))
* **client:** redirect to dashboard if viewed board is deleted ([3f973c4](https://github.com/scrumlens/scrumlens/commit/3f973c4f1504299f257fd83461e40c11d0c12aad))
* **server:** add invite to private board & verify invite ([c34b4be](https://github.com/scrumlens/scrumlens/commit/c34b4bea546bd54cec9c6d56ba0e1e448f33f198))



# [0.4.0](https://github.com/scrumlens/scrumlens/compare/v0.3.1...v0.4.0) (2024-08-15)


### Bug Fixes

* **client:** header scroll ([f833332](https://github.com/scrumlens/scrumlens/commit/f833332fa9f3d80e26d8c9142137d07e10767513))
* **client:** hide connected participants when leaving board ([aa91c96](https://github.com/scrumlens/scrumlens/commit/aa91c9622c24ae4f8e34459d3c8eb9f2a7ae7a3d))


### Features

* **client:** add toast in resend verify link  & countdown ([57b265b](https://github.com/scrumlens/scrumlens/commit/57b265b48aff6de162c0fabecc242dd55c9c982d))
* **client:** allow to turn guest account into personal ([8d16ad9](https://github.com/scrumlens/scrumlens/commit/8d16ad9b2cfff3f0ed5eb54b2b8a4f0ef7cfc40a))
* **server:** add update email ([6b2ee77](https://github.com/scrumlens/scrumlens/commit/6b2ee772573f8bc50f9345bcf40efc6e3da5cc37))



## [0.3.1](https://github.com/scrumlens/scrumlens/compare/v0.3.0...v0.3.1) (2024-08-14)


### Bug Fixes

* **server:** use socket request by user sync ([e8e9ef0](https://github.com/scrumlens/scrumlens/commit/e8e9ef0d87909d7195ddb0e5cff633ddf18ae933))


### Features

* **client:** add socket heartbeat to user sync ([6274962](https://github.com/scrumlens/scrumlens/commit/62749625cbe35d162afb43cb3f2932442acb84d4))



# [0.3.0](https://github.com/scrumlens/scrumlens/compare/v0.2.0...v0.3.0) (2024-08-14)


### Bug Fixes

* **server:** websocket broadcast ([6556a4d](https://github.com/scrumlens/scrumlens/commit/6556a4de619d956b5d8bd150f8e85ad7c108e376))


### Features

* **client:** show connected participants ([#16](https://github.com/scrumlens/scrumlens/issues/16)) ([5b4058e](https://github.com/scrumlens/scrumlens/commit/5b4058e223ff9cb32914e4ea49c51c402f507df4))



# [0.2.0](https://github.com/scrumlens/scrumlens/compare/v0.1.0...v0.2.0) (2024-08-06)


### Features

* add edit button in board view ([#15](https://github.com/scrumlens/scrumlens/issues/15)) ([e17b0b4](https://github.com/scrumlens/scrumlens/commit/e17b0b409b4b2499ad2ee75677c1d385643f25d2))
* **client:** only owner of note or admin can drag note ([a8442de](https://github.com/scrumlens/scrumlens/commit/a8442de5933a8099b4407f45eb0b0059793f7dc4))
* use svg icons ([#14](https://github.com/scrumlens/scrumlens/issues/14)) ([25782ce](https://github.com/scrumlens/scrumlens/commit/25782ceb72e385c05a11fa9eaff846adb400bc14))
* **server:** update fixtures data ([#13](https://github.com/scrumlens/scrumlens/issues/13)) ([4aff148](https://github.com/scrumlens/scrumlens/commit/4aff1485fd5cbd6a152d5d057c2af0eff3d70710))



# [0.1.0](https://github.com/scrumlens/scrumlens/compare/60893fbb129273e47ad509ee34bf9b574d765dd7...v0.1.0) (2024-08-04)


### Bug Fixes

* **client:** await fetch data ([5e67770](https://github.com/scrumlens/scrumlens/commit/5e677708ce0130d58833c8ba56716155f9881204))
* **client:** disable create button by request ([e634d78](https://github.com/scrumlens/scrumlens/commit/e634d78103d13510026db3839adad84fcd4e133c))
* **server:** include columns description in response ([2b69d56](https://github.com/scrumlens/scrumlens/commit/2b69d56a221d3ebc425a5ecede4a75ec3667ae5c))
* **server:** update conten in notes ([0fcac4a](https://github.com/scrumlens/scrumlens/commit/0fcac4ab2d268ef04d098f190aef58fd5f5aebae))
* **server:** update user with middleware ([d2ed0dd](https://github.com/scrumlens/scrumlens/commit/d2ed0ddee7ae6fea21f4276a992cf5bf78eb06c4))


### Features

* **client:** add auth ([#4](https://github.com/scrumlens/scrumlens/issues/4)) ([06ce844](https://github.com/scrumlens/scrumlens/commit/06ce844e31d69efd9d44b7401416f98b11abaefa))
* **client:** add back redirect to url after login ([d52d20b](https://github.com/scrumlens/scrumlens/commit/d52d20b32f0f62559e6ac4affb4bfbb64265f36b))
* **client:** add basic board functionality ([#1](https://github.com/scrumlens/scrumlens/issues/1)) ([451080f](https://github.com/scrumlens/scrumlens/commit/451080fb25e29ca165284579e0eff946e7f878ce))
* **client:** add CRUD for boards ([#11](https://github.com/scrumlens/scrumlens/issues/11)) ([348b123](https://github.com/scrumlens/scrumlens/commit/348b12327219c86396cbb963e1de3e0862a35a5a))
* **client:** add CRUD for notes ([#10](https://github.com/scrumlens/scrumlens/issues/10)) ([499d9dd](https://github.com/scrumlens/scrumlens/commit/499d9dda98476da7fb0f159167230afb9c8e4460))
* **client:** add dark mode ([0f827a0](https://github.com/scrumlens/scrumlens/commit/0f827a07f516eff7fcf74584b16632d2a2049689))
* **client:** add default layout ([f6cd319](https://github.com/scrumlens/scrumlens/commit/f6cd31965bbe1b96c4899d114f466b6bcb6d9880))
* **client:** add list of boards in dashboard ([0ee9705](https://github.com/scrumlens/scrumlens/commit/0ee970516020cc07ccfe620d57af504bc4c45ab0))
* **client:** add loading indicator ([ee11443](https://github.com/scrumlens/scrumlens/commit/ee1144341c84e977469c6173f2ce7cfa938fc1a2))
* **client:** add profile ([eb7ab43](https://github.com/scrumlens/scrumlens/commit/eb7ab437a8f240980e95edcd5e0cbe16a5b3b065))
* **client:** add sign up ([9bb68bd](https://github.com/scrumlens/scrumlens/commit/9bb68bd234a983e038141054c58a0d5206723bdd))
* **client:** add signup as guest ([9a2608f](https://github.com/scrumlens/scrumlens/commit/9a2608f10a9c19043d92f9c3f89625546266a7c1))
* **client:** add tailwind, dark mode, shadcn ([60893fb](https://github.com/scrumlens/scrumlens/commit/60893fbb129273e47ad509ee34bf9b574d765dd7))
* **client:** add verify account ([#12](https://github.com/scrumlens/scrumlens/issues/12)) ([e7aceb7](https://github.com/scrumlens/scrumlens/commit/e7aceb7888d62a122b48dc93d1677f826bbf595a))
* **client:** add websocket ([45ff58a](https://github.com/scrumlens/scrumlens/commit/45ff58aec4eccac00c40d2eb1f6543a643eebbb3))
* **client:** decrease debounce in update board method ([4d07526](https://github.com/scrumlens/scrumlens/commit/4d07526bae35df5891f22d358a311494e0360746))
* **client:** get board data from api ([#6](https://github.com/scrumlens/scrumlens/issues/6)) ([c24f2f2](https://github.com/scrumlens/scrumlens/commit/c24f2f2240a82f1676230f27b6bc60eaa00719c3))
* **client:** get user data from api ([#8](https://github.com/scrumlens/scrumlens/issues/8)) ([e314231](https://github.com/scrumlens/scrumlens/commit/e31423156a7e9ad95285b81a7691d816028851b8))
* **server:** add email providers, send verify link ([8ee8d8c](https://github.com/scrumlens/scrumlens/commit/8ee8d8c06be169a8077d9c580ba975ecc7717c18))
* **server:** add limit to create boards for non active & guest users ([f841da7](https://github.com/scrumlens/scrumlens/commit/f841da7fa933317c96f6a020770e9358a06c67d3))
* add notes api ([#9](https://github.com/scrumlens/scrumlens/issues/9)) ([a352f87](https://github.com/scrumlens/scrumlens/commit/a352f87dbfcf4a13b380f7aafb93ad0dddbd9b0e))
* add users api ([#7](https://github.com/scrumlens/scrumlens/issues/7)) ([dac375a](https://github.com/scrumlens/scrumlens/commit/dac375a677297e230d883e575403e8f71afef82a))
* **server:** add `isGuest` prop in user model ([d86852c](https://github.com/scrumlens/scrumlens/commit/d86852cbf098d63ff8e88d6e746c5e07affd937b))
* **server:** add auth api ([#3](https://github.com/scrumlens/scrumlens/issues/3)) ([f88eb2f](https://github.com/scrumlens/scrumlens/commit/f88eb2f5296988a5d54bcb2e868cf471b9178d4d))
* **server:** add board, note & comment model ([7e650a9](https://github.com/scrumlens/scrumlens/commit/7e650a98339f7414199681f65accf65fb0aa314f))
* **server:** add boards api ([#5](https://github.com/scrumlens/scrumlens/issues/5)) ([5676d9e](https://github.com/scrumlens/scrumlens/commit/5676d9eeb5471ef99b2ba5dbb5f9d15551789b94))
* **server:** add fixtures & seed db ([bb21e22](https://github.com/scrumlens/scrumlens/commit/bb21e22f8f6e871056cc756596519e1846eb8902))
* **server:** add logger ([24ad068](https://github.com/scrumlens/scrumlens/commit/24ad068a4b148e2bf746b44d6d1602b1d93b4818))
* **server:** add user model & fixtures ([#2](https://github.com/scrumlens/scrumlens/issues/2)) ([c7caf18](https://github.com/scrumlens/scrumlens/commit/c7caf189c8d95ea8dd4fda020b03bbcc363f4955))
* **server:** add websocket ([90f97d0](https://github.com/scrumlens/scrumlens/commit/90f97d0db49f59ccfce81dd6b2f585ff80a41a96))
* **server:** auth immediately after create guest user ([c86dec6](https://github.com/scrumlens/scrumlens/commit/c86dec6232783fae05c9c7f7c977a953e80623eb))
* **server:** remove boards, notes & comments from user model ([55184e0](https://github.com/scrumlens/scrumlens/commit/55184e0b0241624996aa239da7425016c776d394))



